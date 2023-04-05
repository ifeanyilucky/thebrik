import styled from 'styled-components';
import { Box, Link, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../components/Logo';
import Label from '../../components/Label';
import menuConfig from './MenuConfig';

export default function CustomNavbar() {
  return (
    <Wrapper>
      <Container maxWidth="lg">
        <div className="brand">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Label color="info" sx={{ ml: 1 }}>
            .co
          </Label>
        </div>
        <nav>
          <div className="nav-mobile">
            <a id="nav-toggle" href="#!">
              <span />
            </a>
          </div>
          <ul className="nav-list">
            {menuConfig.map((navitem, index) => (
              <li key={index}>
                <Link component={RouterLink} to={navitem.path}>
                  {navitem.title}
                </Link>
                <ul className="nav-dropdown">
                  {navitem.children &&
                    navitem.children.map((item, i) => (
                      <li key={i}>
                        <a href="#!">Web Design</a>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
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

          text-decoration: none;
          &:hover {
            background: #2581dc;
            color: #fff;
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
`;
