import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import { PublicRouter, adminRoutes } from './routes/router';
import HOME from './pages/home/home';
import DefaultLayout from './layouts/defaultLayout/defaultLayout';
import Login from './components/login';
import Register from "./components/register/index"

function App() {


  return (
    <div className="App">

      <Router>
        <Routes>

          {PublicRouter.map((router, index) => {
            var Page = router.component
            var Layout = DefaultLayout
            return <Route key={index} path={router.path} element={<Layout><Page /></Layout>} />
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
