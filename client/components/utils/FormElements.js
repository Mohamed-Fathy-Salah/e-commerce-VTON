import { Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons';
import { useField } from 'formik';
import Image from 'next/image';

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-3 md:flex-row'>
        <label className='my-2' htmlFor={props.id || props.name}>
          {label}
        </label>
        {meta.touched && meta.error ? (
          <div className='text-center text-red-500'>{meta.error}</div>
        ) : null}
      </div>
      {props.type === 'textarea' ? (
        <textarea
          className='rounded-md text-lg'
          {...field}
          {...props}
        ></textarea>
      ) : (
        <input className=' rounded-md text-lg' {...field} {...props} />
      )}
    </div>
  );
};

export const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div className='flex flex-col p-4 md:flex-row md:justify-between'>
      <label className='checkbox-input'>
        <input
          type='checkbox'
          className=' mx-2 rounded-md text-lg'
          {...field}
          {...props}
        />
        {children}
      </label>

      {meta.touched && meta.error ? (
        <div className='inline-block text-red-500'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <div className='flex items-center justify-between gap-1 px-3'>
        <label className='my-2' htmlFor={props.id || props.name}>
          {label}
        </label>
        {meta.touched && meta.error ? (
          <div className='text-center text-red-500'>{meta.error}</div>
        ) : null}
      </div>
      <select {...field} {...props} className=' w-full rounded-md text-lg' />
    </div>
  );
};

export const Droparea = (props) => {
  const theme = useMantineTheme();

  return (
    <div className='flex w-full flex-col items-start'>
      <Dropzone
        // onDrop={(files) => console.log('accepted files', files)}
        // onReject={(files) => console.log('rejected files', files)}
        onDrop={props.onDrop}
        onReject={props.onReject}
        accept={IMAGE_MIME_TYPE}
        {...props}
        multiple={props.multiple}
        className='w-full'
      >
        <Group
          position='center'
          spacing='xl'
          style={{ minHeight: 220, pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === 'dark' ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} className='hidden md:block' />
          </Dropzone.Idle>

          <div>
            <Text size='xl' inline>
              Upload Profile Photo
            </Text>
            <Text size='sm' color='dimmed' inline mt={7}>
              Drag images here or click to select files
            </Text>
          </div>
        </Group>
      </Dropzone>
      {props.multiple
        ? props.photos && (
            <div className='mt-3 flex gap-3'>
              {props.photos.map((photo) => (
                <Image
                  key={photo.path}
                  src={URL.createObjectURL(photo)}
                  width={120}
                  height={120}
                  objectFit='cover'
                  className='rounded-md'
                />
              ))}
            </div>
          )
        : props.photo && (
            <Image
              src={URL.createObjectURL(props.photo)}
              width={200}
              height={200}
              objectFit='cover'
              className='rounded-md'
            />
          )}
    </div>
  );
};
