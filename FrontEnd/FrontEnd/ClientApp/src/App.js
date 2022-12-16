import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import './custom.css';
import 'semantic-ui-css/semantic.min.css'
import HomePage from './pages/HomePage.js';
import TodoPage from './pages/TodoPage.js';
import DetailsModal from './components/modals/detailsModal';
import ElementPage from './pages/Element';
import CategoryPage from './pages/CategoryPage';





export default class App extends Component {

  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Todo" element={<TodoPage />} />
          <Route path="/element" element={<ElementPage />} />
          <Route path="/Category" element={<CategoryPage />} />
        </Routes>
      </Layout>
    );
  }
}
