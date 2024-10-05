import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';
import router from './router';

const loading = (
    <div className="loading">
      <div className="loading-ring"></div>
    </div>
  )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={loading}>
        <RouterProvider router={router}/>
    </Suspense>
);

