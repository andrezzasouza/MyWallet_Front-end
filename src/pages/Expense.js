import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "../assets/SharedStyles/Input";
import { LongButton } from "../assets/SharedStyles/LongButton";
import Header from "../components/Header";
import Loader from "react-loader-spinner";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function Expense () {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(true);
  const history = useHistory();
  const { userData } = useContext(UserContext);

  // console.log("uD", userData);
  // console.log("json", JSON.parse(localStorage.getItem("loginData")));

  useEffect(() => {
  if (!userData.token) {
    history.push("/");
  }
  }, [userData, history]);

  function addExpense(e) {
    setEnabled(false);
    e.preventDefault();

    const body = {
      description,
      value: Number(value).toFixed(2),
      type: "expense",
    };

    console.log(typeof(value));
    const token = `Bearer ${userData.token}`;
    const promise = axios.post("http://localhost:4000/income", body, {
      headers: { Authorization: token },
    });

    promise
      .then(() => {
        history.push("/home");
      })
      .catch((res) => {
        if (res.response.status === 400) {
          alert("Dados inválidos. Verifique-os e tente novamente.");
        } else if (res.response.status === 401) {
          // there are 2 cases here
        } else if (res.response.status === 500) {
          alert(
            "Não foi possível pegar os dados da sua conta. Tente novamente."
          );
        } else {
          alert("Algo deu errado. Tente novamente.");
        }
        setEnabled(true);
      });
  }

  return (
    <>
      <Header pageTitle="Nova saída" hasLogOutIcon={false} margin="40px" />
      <form onSubmit={addExpense}>
        <Input
          placeholder="Valor"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clickable={enabled}
          disabled={!enabled}
          required
        />
        <Input
          placeholder="Descrição"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          clickable={enabled}
          disabled={!enabled}
          required
        />
        <LongButton type="submit" margin="36px" clickable={enabled}>
          {enabled ? (
            "Salvar saída"
          ) : (
            <Loader
              type="ThreeDots"
              color="white"
              height={50}
              width={100}
              timeout={3000}
            />
          )}
        </LongButton>
      </form>
    </>
  );
}
