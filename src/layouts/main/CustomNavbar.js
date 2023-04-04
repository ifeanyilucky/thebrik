import styled from 'styled-components';
import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../components/Logo';
import Label from '../../components/Label';

export default function CustomNavbar() {
  return (
    <Wrapper>
      <section className="navigation">
        <div className="nav-container">
          <div className="brand">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
            <Label color="info" sx={{ ml: 1 }}>
              .co
            </Label>
            <Box sx={{ flexGrow: 1 }} />
          </div>
          <nav>
            <div className="nav-mobile">
              <a id="nav-toggle" href="#!">
                <span />
              </a>
            </div>
            <ul className="nav-list">
              <li>
                <a href="#!">Home</a>
              </li>
              <li>
                <a href="#!">About</a>
              </li>
              <li>
                <a href="#!">Services</a>
                <ul className="nav-dropdown">
                  <li>
                    <a href="#!">Web Design</a>
                  </li>
                  <li>
                    <a href="#!">Web Development</a>
                  </li>
                  <li>
                    <a href="#!">Graphic Design</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#!">Pricing</a>
              </li>
              <li>
                <a href="#!">Portfolio</a>
                <ul className="nav-dropdown">
                  <li>
                    <a href="#!">Web Design</a>
                  </li>
                  <li>
                    <a href="#!">Web Development</a>
                  </li>
                  <li>
                    <a href="#!">Graphic Design</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#!">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  // Navigation Variables

  // Outer navigation wrapper
  .navigation {
    height: 70px;
    background: transparent;
  }

  // Logo and branding
  .brand {
    position: absolute;
    padding-left: 20px;
    float: left;
    line-height: 70px;
    text-transform: uppercase;
    font-size: 1.4em;
    a,
    a:visited {
      color: #fff;
      text-decoration: none;
    }
  }

  // Container with no padding for navbar
  .nav-container {
    max-width: 1000px;
    margin: 0 auto;
  }

  // Navigation
  nav {
    float: right;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        float: left;
        position: relative;
        a,
        a:visited {
          display: block;
          padding: 0 20px;
          line-height: 70px;
          background: #262626;
          color: #fff;
          text-decoration: none;
          &:hover {
            background: #2581dc;
            color: #fff;
          }
          &:not(:only-child):after {
            padding-left: 4px;
            content: ' ▾';
          }
        } // Dropdown list
        ul li {
          min-width: 190px;
          a {
            padding: 15px;
            line-height: 20px;
          }
        }
      }
    }
  }

  // Dropdown list binds to JS toggle event
  .nav-dropdown {
    position: absolute;
    display: none;
    z-index: 1;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  }

  /* Mobile navigation */

  // Binds to JS Toggle
  .nav-mobile {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    background: #262626;
    height: 70px;
    width: 70px;
  }
  @media only screen and (max-width: 798px) {
    // Hamburger nav visible on mobile only
    .nav-mobile {
      display: block;
    }
    nav {
      width: 100%;
      padding: 70px 0 15px;
      ul {
        display: none;
        li {
          float: none;
          a {
            padding: 15px;
            line-height: 20px;
          }
          ul li a {
            padding-left: 30px;
          }
        }
      }
    }
    .nav-dropdown {
      position: static;
    }
  }
  @media screen and (min-width: 799px) {
    .nav-list {
      display: block !important;
    }
  }
  #nav-toggle {
    position: absolute;
    left: 18px;
    top: 22px;
    cursor: pointer;
    padding: 10px 35px 16px 0px;
    span,
    span:before,
    span:after {
      cursor: pointer;
      border-radius: 1px;
      height: 5px;
      width: 35px;
      background: #fff;
      position: absolute;
      display: block;
      content: '';
      transition: all 300ms ease-in-out;
    }
    span:before {
      top: -10px;
    }
    span:after {
      bottom: -10px;
    }
    &.active span {
      background-color: transparent;
      &:before,
      &:after {
        top: 0;
      }
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
    }
  }

  // Page content
  article {
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
  }
`;
