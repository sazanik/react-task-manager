import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import './Help.css'

const Help = () => {

  const history = useHistory()

  return (
    <div className='Help'>
      <button onClick={() => history.goBack()}>BACK</button>
      <h1>Description App</h1>
      <p>
        <ul>
          <li><b>Страница авторизации</b>
            <ol>
              <li>Введите почту, зарегистрированную ранее.</li>
              <li>Введите пароль, указанный при регистрации.</li>
              <li>Нажмите кнопку "LOGIN", чтобы отправить данные на сервер.</li>
              <i>При вводе несуществующих данных, некорректного формата электронной почты,
              или наличия ошибок сети, Вы получите соответствующее сообщение ниже поля
              ввода пароля</i>
            </ol>
            <br/>
          </li>
          <li><b>Страница регистрации</b></li>

        </ul>
      </p>
    </div>
  )

}

export default Help