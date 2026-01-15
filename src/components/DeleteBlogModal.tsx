import React from 'react'

export default function DeleteBlogModal({ title, isOpen, onCancel, onConfirm }:{title:string, isOpen:boolean,onCancel: ()=>void, onConfirm:()=>void}) {
    
    
    if (!isOpen) return null;
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-sm w-full">
        <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Confirm Delete</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Are you sure you want to delete "{title}"?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
