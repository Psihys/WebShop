import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index.js'
import './styles/Auth.css'


const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const setSign = async () => {
  try {
    let data;
    if (isLogin) {
      data = await login(email, password); // Логин
    } else {
      data = await registration(email, password); // Регистрация
    }

    // Сохраняем пользователя в контексте и авторизуем
    user.setUser(data);  // Передаем данные пользователя
    user.setIsAuth(true); // Отмечаем, что пользователь авторизован

    console.log(data);

    // После успешного выполнения логина или регистрации, перенаправляем на SHOP_ROUTE
    navigate(SHOP_ROUTE);
  } catch (error) {
    console.error('Error during authentication:', error);
    alert(error.response.data.message);
    // Обработка ошибки
  }
}

  return (
    <Container className='auth-container'>
      <Card className='auth-card'>
        <h2 className='auth-title'>{isLogin ? 'Authorization' : 'Registration'}</h2>
        <Form className='auth-form'>
          {isLogin ? (
            <>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Введите ваш email'
              />
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Введите ваш пароль'
              />
            </>
          ) : (
            <>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Введите ваш email'
              />

              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Введите ваш пароль'
              />
            </>
          )}
          <Row className='auth-reg_log'>
            
            <Button 
              className='auth-button'
              variant={'outline-dark'}
              onClick={setSign} // вызываем функцию setSign при клике на кнопку
            >
              {isLogin ? 'Login' : 'Registration'}
            </Button>
            {isLogin ? (
              <div className='auth-link'>
                Don't have an account?{' '}
                <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
              </div>
            ) : (
              <div className='auth-link'>
                Have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  )
})

export default Auth
