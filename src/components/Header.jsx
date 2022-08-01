import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends React.Component {
  toggleSideBar() {
    const btnLeft = document.querySelector('.toggle-btn-left');
    const btnMiddle = document.querySelector('.toggle-btn-middle');
    const btnRight = document.querySelector('.toggle-btn-right');
    btnLeft.classList.toggle('active');
    btnMiddle.classList.toggle('active');
    btnRight.classList.toggle('active');
    const sideBar = document.querySelector('.mobile-header-side-bar');
    sideBar.classList.toggle('active');
  }

  render() {
    return (
      <header className="header-component">
        <h1>TrybeTunes</h1>
        <button
          aria-label="toggle-sidebar"
          className="toggle-btn"
          type="button"
          onClick={ this.toggleSideBar }
        >
          <div className="toggle-btn-left" />
          <div className="toggle-btn-middle" />
          <div className="toggle-btn-right" />
        </button>
        <section className="mobile-header-side-bar">
          <nav>
            <Link
              to="/search"
              onClick={ this.toggleSideBar }
            >
              Busca
            </Link>
            <Link
              to="/favorites"
              onClick={ this.toggleSideBar }
            >
              Favoritas
            </Link>
            <Link
              to="/profile"
              onClick={ this.toggleSideBar }
            >
              Perfil
            </Link>
          </nav>
        </section>
        <section className="desktop-header-bar">
          <nav>
            <Link to="/search">Busca</Link>
            <Link to="/favorites">Favoritas</Link>
            <Link to="/profile">Perfil</Link>
          </nav>
        </section>
      </header>
    );
  }
}
