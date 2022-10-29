import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import "./login.css";

export const Login = () => {
  const [comentsUsers, setComentsUsers] = useState([]);
  const [form, setForm] = useState({
    mail: "",
    password: "",
  });

  useEffect(() => {
    setComentsUsers([
      {
        coment: "Prueba comentario",
        image:
          "https://as2.ftcdn.net/v2/jpg/00/37/35/05/1000_F_37350539_vamnXQHLvK1ECLHweLKd6bLiUlRlz10k.jpg",
        userName: "Pepe",
      },
      {
        coment: "Prueba2 comentario",
        image:
          "https://as2.ftcdn.net/v2/jpg/00/37/35/05/1000_F_37350539_vamnXQHLvK1ECLHweLKd6bLiUlRlz10k.jpg",
        userName: "Juan",
      },
    ]);
  }, []);

  const templateComentsUsers = (comentsUsers) => {
    return (
      <div>
        <p>{comentsUsers.coment}</p>
        <div>
          <img style={{ width: "30px" }} src={comentsUsers.image} />
          <label>{comentsUsers.userName}</label>
        </div>
      </div>
    );
  };

  const handelChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div>
      <main>
        <div>
          <h2>Titulo</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur, aspernatur repudiandae voluptatibus unde nam,
            molestias asperiores officiis qui perferendis voluptatem cupiditate
            error cumque officia inventore autem magnam ad? Illo, sapiente.
          </p>
          <Carousel
            value={comentsUsers}
            numVisible={1}
            numScroll={1}
            circular
            autoplayInterval={5000}
            itemTemplate={templateComentsUsers}
          />
        </div>
        <form onSubmit={handelSubmit}>
          <h1>Login</h1>
          <label>
            No tenes una cuenta? <Link to="/register">Registrarse</Link>
          </label>
          <input
            type="email"
            maxLength={30}
            required
            name="mail"
            onChange={handelChange}
          />
          <input type="password" name="password" onChange={handelChange} />
          <button>Login</button>
        </form>
      </main>
    </div>
  );
};
