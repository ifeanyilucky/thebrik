import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled as MuiStyled } from '@mui/material/styles';
import { useAutocomplete, autocompleteClasses } from '@mui/material';
import { PATH_PAGE } from '../../../routes/paths';
import { useAnalyticsEventTracker } from '../../../hooks/useAnalyticEventTracker';

const Input = MuiStyled('input')(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  color: theme.palette.mode === 'light' ? '#000' : '#fff'
}));

const Listbox = MuiStyled('ul')(({ theme }) => ({
  width: '100%',
  margin: 0,
  padding: 10,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: '#fff',
  overflow: 'auto',
  maxHeight: 200,
  borderRadius: '18px',
  border: '1px solid #daedff',
  '& li': {
    cursor: 'pointer',
    backgroundColor: '#f4f4f4',
    padding: '8px 14px',
    margin: '8px 0',
    textTransform: 'capitalize',
    borderRadius: '18px'
  },
  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer'
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white'
  }
}));

const areas = ['iba junction', 'ppl', 'post service', 'first gate', 'iyana school', 'ipaye'];

export default function HeroSearchbar() {
  const navigate = useNavigate();
  const gaEventTracker = useAnalyticsEventTracker('Homepage search');
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id: 'area-search',
    onChange: (e) => {
      console.log(e.target.value);
    },
    options: areas,
    getOptionLabel: (option) => option
  });

  const [areaSearch, setAreaSearch] = useState('');

  const onSearch = () => {
    if (areaSearch) {
      navigate(`${PATH_PAGE.hostels}?area=${areaSearch}`);
      gaEventTracker(`User searched for ${areaSearch}`, 'filter');
    }
  };
  return (
    <Wrapper>
      <div className="search-form" role="search">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="area-search" className="label">
          Search area
        </label>
        <input
          id="area-search"
          type="search"
          placeholder="Enter area"
          onChange={(e) => {
            setAreaSearch(e.target.value);
          }}
        />
        <button onClick={onSearch} type="button">
          Go
        </button>
      </div>
      {/* <div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li key={index} {...getOptionProps(option, index)}>
                {option}
              </li>
            ))}
          </Listbox>
        ) : null}
      </div> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  .search-form {
    position: relative;
    min-width: 100%;
    width: 400px;
    @media (max-width: 768px) {
      width: 100%;
    }
    max-width: 100%;
    background: #135bfd;
    border-radius: 18px;
  }
  input,
  button {
    height: 3.5rem;
    color: #fff;
    font-size: inherit;
    font-family: inherit;
    outline: none;
    border: 0;
  }
  input[type='search'] {
    outline: 0; // <-- shold probably remove this for better accessibility, adding for demo aesthetics for now.
    width: 100%;
    background: #fff;
    padding: 0 1.1rem;
    border-radius: 16px;
    appearance: none; //for iOS input[type="search"] roundedness issue. border-radius alone doesn't work
    transition: all 0.3s cubic-bezier(0, 0, 0.43, 1.49);
    transition-property: width, border-radius;
    z-index: 1;
    position: relative;
    color: inherit;
    background-color: #ebf2f7;
    border: 0;
    ::-webkit-search-cancel-button {
      position: relative;
      right: 20px;
      height: 20px;
      width: 20px;
      border-radius: 10px;
      background: #f4f4f4;
    }
  }
  button {
    display: none; // prevent being able to tab to it
    position: absolute;
    top: 0;
    right: 0;
    width: 6rem;
    font-weight: bold;
    background: #135bfd;
    border-radius: 0 18px 18px 0;
  }
  input:not(:placeholder-shown) {
    border-radius: 18px 0 0 18px;
    width: calc(100% - 6rem);
    + button {
      display: block;
    }
  }
  .label {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }
`;
