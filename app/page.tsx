import Image from "next/image";

export default function Home() {

  fetch(`http://localhost:8080/api/books`)
      .then(response => response.json())
      .then(data => console.log(data) )
      .catch(error => console.error(error))


  return (
    <>{  fetch(`http://localhost:8080/api/books`)
        .then(response => response.json())
        .then(data => console.log(data) )
        .catch(error => console.error(error))}</>
  );
}
