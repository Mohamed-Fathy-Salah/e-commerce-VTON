import { useField } from 'formik';

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
