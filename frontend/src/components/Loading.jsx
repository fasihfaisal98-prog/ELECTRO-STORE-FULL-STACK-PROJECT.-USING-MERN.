import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({ text = 'Loading...', fullScreen = false, size = 'default' }) => {
  const spinnerSize = size === 'small' ? 'w-5 h-5' : size === 'large' ? 'w-12 h-12' : 'w-8 h-8';

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
        <Loader2 className={`${spinnerSize} animate-spin text-blue-600 mb-3`} />
        {text && <p className="text-slate-600 font-medium text-sm animate-pulse">{text}</p>}
      </div>
    );
  }

  return (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <Loader2 className={`${spinnerSize} animate-spin text-blue-600 mb-3`} />
      {text && <p className="text-slate-500 font-medium text-sm">{text}</p>}
    </div>
  );
};

export default Loading;
