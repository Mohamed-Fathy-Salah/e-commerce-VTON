import cv2
import numpy as np

# back_shirt_coordinates = 10, 258, 491, 505
# front_shirt_coordinates = 547, 254, 462, 525
coordinates = {
        'old-t-shirt_female': {
            'back' : (20, 258, 471, 505),
            'front': (557, 254, 442, 525)
        },
        't-shirt_male': {
            'back' : (12, 317, 491, 384),
            'front': (551, 325, 436, 379)
        },
        'short-pant_female': {
            'back' : (17, 262, 486, 501),
            'front': (521, 263, 489, 530)
        }
}

# wl / ws * wc, hl / hs * hc
def relative_scale(shirt, logo, coords):
    return int(logo[2] / shirt[2] * coords[2]), int(logo[3] / shirt[3] * coords[3])

# (xl - xs) / ws * wc + xc
def relative_pos(shirt, logo, coords):
    return int((logo[0] - shirt[0]) / shirt[2] * coords[2] + coords[0]), int((logo[1] - shirt[1]) / shirt[3] * coords[3] + coords[1])

def dominant_color(image, mask):
    masked = cv2.bitwise_and(image, image, mask=mask)
    cnt = len(masked[np.max(masked, axis=2) > 0])
    avg_color = np.sum(np.sum(masked, axis=0), axis=0) / cnt
    return avg_color

def show(image):
    cv2.imshow("hi", cv2.resize(image, (500, 500)))
    cv2.waitKey(0)

def pos(mask):
    if len(mask.shape) == 3:
        mask = cv2.cvtColor(mask, cv2.COLOR_RGB2GRAY)
    xm, ym, wm, hm = cv2.boundingRect(cv2.findNonZero(mask))
    return xm, ym, wm, hm

def get_garment_mask(image):
    # image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    _, im_th = cv2.threshold(image, 220, 255, cv2.THRESH_BINARY_INV)

    h, w = image.shape[:2]
    mask = np.zeros((h+2, w+2), np.uint8)

    im_floodfill = im_th.copy()
    cv2.floodFill(im_floodfill, mask, (0, 0), 255)

    im_floodfill_inv = cv2.bitwise_not(im_floodfill)

    return im_th | im_floodfill_inv

def get_logo_mask(image, mask, gar_dim):
    blur = cv2.blur(image, (3, 3))
    # blur = gray
    blur = cv2.normalize(blur, None, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8U)

    # edge = cv2.Laplacian(blur, ddepth=cv2.CAP_V4L)
    edge = cv2.Laplacian(blur, ddepth=cv2.CV_8U)
    # show(edge)
    
    # edge = cv2.medianBlur(edge, 5)
    _, edge = cv2.threshold(edge, 0, 255, cv2.THRESH_OTSU)

    # kernel = np.ones((5, 5), np.uint8)
    # edge = cv2.dilate(edge, kernel, iterations=1)
    # kernel = np.ones((3, 3), np.uint8)
    # edge = cv2.erode(edge, kernel, iterations=1)

    contours, _ = cv2.findContours(edge, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE) 
    # cv2.drawContours(image, contours, -1, (255,0,0), cv2.FILLED)
    # cv2.drawContours(mask, [mxs[-3]], 0, 255, -1)
    for h, cnt in enumerate(contours):
        area = cv2.contourArea(cnt)
        x, y, w, h = cv2.boundingRect(cnt)
        # if area > 20:
        if area > 20 and x * .9 > gar_dim[0] and y * .9 > gar_dim[1] and w < gar_dim[2] * .9 and h < gar_dim[3] *.9:
            cv2.drawContours(mask, [cnt], 0, (255, 0, 0), -1)

    # image = cv2.floodFill(image, None, (0, 0), 255)
    # show(mask)
    

def generate_texture_map(front_image_path=None, back_image_path=None,
        garment_gender=None):
    texture_map = np.zeros((1024, 1024, 3)) 
    garment_coordinates = coordinates[garment_gender]
    garment_coordinates = [garment_coordinates['back'], garment_coordinates['front']]
    dom_color = None

    for idx, path in enumerate([back_image_path, front_image_path]):
        if not path:
            continue

        image = cv2.imread(path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        garment_mask = get_garment_mask(gray)
        
        mask = np.zeros(image.shape, np.uint8)

        gar_dim = pos(garment_mask)

        get_logo_mask(gray, mask, gar_dim)
        get_logo_mask(image[:,:,0], mask, gar_dim)
        get_logo_mask(image[:,:,1], mask, gar_dim)
        get_logo_mask(image[:,:,2], mask, gar_dim)

        mask = mask[:,:,0]

        # logo_mask = mask & garment_mask
        logo_mask = cv2.bitwise_and(mask, mask, mask=garment_mask)
        logo_mask_inv = cv2.bitwise_not(logo_mask) 

        garment_without_logo = cv2.bitwise_and(garment_mask, garment_mask, mask=logo_mask_inv)

        dom_color = dominant_color(image, garment_without_logo)
        
        if front_image_path and back_image_path:
            texture_map[:,idx*512:idx*512+512] = dom_color
        else :
            texture_map[:,:] = dom_color

        if("shirt" in garment_gender):
            logo_dim = pos(logo_mask)

            (w, h), (x, y) = relative_scale(gar_dim, logo_dim, garment_coordinates[idx]), relative_pos(gar_dim, logo_dim, garment_coordinates[idx])
            
            logo = cv2.bitwise_and(image, image, mask=logo_mask)
            logo = logo[logo_dim[1]:logo_dim[1] + logo_dim[3], logo_dim[0]:logo_dim[0] + logo_dim[2]]
            logo = cv2.resize(logo ,(w, h))
            logo_mask = logo_mask[logo_dim[1]:logo_dim[1] + logo_dim[3], logo_dim[0]:logo_dim[0] + logo_dim[2]]
            logo_mask = cv2.resize(logo_mask ,(w, h))

            logo[logo_mask == 0] = dom_color
            texture_map[y : y + logo.shape[0], x : x + logo.shape[1]] = logo

    return texture_map 

if __name__ == "__main__":
    # paths = stdin.readlines()
    # paths = ['./images/lungs.jpg\n']
    # for path in paths:
        # generate_texture_map(path[:-1])
    front_image_path = './images/shirt/lungs.jpg'
    back_image_path = './images/shirt/blackheart.jpg'
    garment_gender = 't-shirt_male'
    texture_map = generate_texture_map(front_image_path, back_image_path, garment_gender)
    show(texture_map / 255)
    cv2.imwrite(f"./results/{garment_gender}/h.png", texture_map)
