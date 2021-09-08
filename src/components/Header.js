import React, { useEffect } from 'react'
import { auth, provider } from '../firebase'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import {
  selectUserName,
  setUserLogin,
  setSignOut,
} from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

function Header() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userName = useSelector(selectUserName)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        )
        history.push('/')
      }
    })
  }, [])

  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let user = result.user
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      )
      history.push('/')
    })
  }

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut())
      history.push('/login')
    })
  }

  const homePage = () => {
    history.push('/')
  }

  return (
    <Nav>
      <Logo onClick={homePage} src="/images/logo.svg" />
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a href>
              <img src="/images/home-icon.svg" alt="" />
              <span>HOME</span>
            </a>
            <a href>
              <img src="/images/search-icon.svg" alt="" />
              <span>SEARCH</span>
            </a>
            <a href>
              <img src="/images/watchlist-icon.svg" alt="" />
              <span>WATCHLIST</span>
            </a>
            <a href>
              <img src="/images/original-icon.svg" alt="" />
              <span>ORIGINAL</span>
            </a>
            <a href>
              <img src="/images/movie-icon.svg" alt="" />
              <span>MOVIES</span>
            </a>
            <a href>
              <img src="/images/series-icon.svg" alt="" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg
            onClick={signOut}
            src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.6435-1/p480x480/40633647_669479883425339_4734202924073222144_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=7206a8&_nc_ohc=0HsNs0Z2F0YAX-klLjO&_nc_ht=scontent-sin6-4.xx&oh=2411762ede6ec9ac3b1893f9da65369d&oe=615C2535"
          />
        </>
      )}
    </Nav>
  )
}

export default Header

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`

const Logo = styled.img`
  width: 80px;
  cursor: pointer;
`

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: '';
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`
const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`
const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`
