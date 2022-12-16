import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Button } from 'semantic-ui-react';
import CreateTodo from './creates/createTodo';
import { TodoAPI } from '../services';
import CreateCategory from './creates/createCategory';
import CreateElement from './creates/createElement';


export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };

    
  }
  
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {  
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} className="text-dark" to="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <CreateTodo onCreateTodo={this.props.onCreateTodo} /> 
              <Button inverted color='blue' as={Link} to='/Category'>Category</Button>
              <Button inverted color='blue' as={Link} to='/Element'>Element</Button>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
