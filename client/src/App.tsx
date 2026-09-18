import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Due from './pages/Due';
import All from './pages/All';
import Add from './pages/Add';
import ProblemReview from './pages/ProblemReview';

function App() {
  return (
    <div className='max-w-200 mx-auto'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />}>
            <Route path='due' element={<Due />} />
            <Route path='all' element={<All />} />
            <Route path='add' element={<Add />} />
            <Route path='review/:id' element={<ProblemReview />} />
          </Route>
        </Routes>
        {/* <App /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
