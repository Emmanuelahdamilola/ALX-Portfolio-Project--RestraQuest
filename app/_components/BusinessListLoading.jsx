import React from 'react';

// Component for rendering placeholders while business list is loading
function BusinessListLoading() {
  return (
    <div>
      {/* Placeholder for business banner */}
      <div className='w-full h-[200px] rounded-xl animate-pulse bg-slate-100'></div>
      {/* Placeholder for business name */}
      <div className='w-full h-10 mt-3 rounded-lg animate-pulse bg-slate-100'></div>
    </div>
  );
}

export default BusinessListLoading;
