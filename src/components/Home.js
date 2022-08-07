import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SingleCard from "./SingleCard";

export default function Home() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [filterItems, setFilterItems] = useState([]);
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/Akshay-Katariya/c35e5851c59873949903216879fa5013/raw/294bd45545d53fbbb7d7a8c1b3966536d15dd083/user.json"
      )
      .then((res) => {
        setUser(res.data);
        setFilterItems(res.data);
      })
      .then(() => sortUsers())
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    handleFilterItems(e.target.value);
  };

  const sortUsers = () => {
    let sortUser = filterItems.sort((a, b) => {
      if (a.company.name > b.company.name) {
        return 1;
      }
      if (a.company.name < b.company.name) {
        return -1;
      } else {
        return 0;
      }
    });
    return sortUser;
  };

  const handleFilterItems = (searchText) => {
    if (!searchText) {
      setFilterItems(user);
    } else {
      setFilterItems(
        filterItems.filter((item) => {
          let searchTerm = searchText.toLowerCase();
          let itemName = item.name.toLowerCase();
          return searchTerm && itemName.includes(searchTerm);
        })
      );
    }
    sortUsers();
  };

  const findAge = (dob) => {
    let from = dob.split("/");
    let birthdateTimeStamp = new Date(from[2], from[1] - 1, from[0]);
    let cur = new Date();
    let diff = cur - birthdateTimeStamp;
    let currentAge = Math.floor(diff / 31557600000);

    return currentAge;
  };

  const handleAgeFilter = () => {
    setBtn(!btn);

    if (!btn) {
      const filterAge = filterItems.filter(
        (item) =>
          item.dob &&
          findAge(item.dob) >= 70 &&
          findAge(item.dob) <= 80 &&
          item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterItems(filterAge);
      sortUsers();
    } else {
      handleFilterItems(search);
      setFilterItems(user);
      sortUsers();
    }
  };

  return (
    <div className="App">
      <div className="Heading">Codeberry Task</div>
      <div className="Controls">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by Name..."
        />
        <div className="Filter">
          <span>Filter:</span>
          <button
            onClick={handleAgeFilter}
            style={btn ? { backgroundColor: "green", color: "white" } : {}}
          >
            age group of "70 - 80"
          </button>
        </div>
      </div>
      <div className="Content">
        {sortUsers().length
          ? sortUsers().map((item) => {
              return <SingleCard key={item.id} item={item} />;
            })
          : null}
      </div>
      {/* <div></div> */}
    </div>
  );
}
