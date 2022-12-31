import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './templates/Header';

//importng screens
const HomeScreen = lazy(() => import("./screens/HomeScreen"))


function App() {

  return (

    //Defining BrowserRoutes that uses HTML history apis for syncing b/w UI and url
    <BrowserRouter>

      {/* Suspense shows loading untill required data is not loaded */}
      <Suspense fallback={<div>Loading...</div>}>
        <Header ></Header>

        {/* //defining routes */}
        <Routes>

          {/* Making condition for screens  */}
          <Route path="/" exact element={<HomeScreen />} />

        </Routes>

      </Suspense>

    </BrowserRouter>

  );
}

export default App;
