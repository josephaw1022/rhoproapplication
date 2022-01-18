import axios from "axios";
import React, { useEffect, useState } from "react";



export default function Home() {
  /**
   * State 
   */
	const [data, setData] = useState(null);

  /**
   * Obtain the data for the page 
   */
	useEffect(() => {
		const getData = async () => {
			const resp = await axios.get("api/hello")
      setData(resp) 
		};
		getData();
	}, []);
  

	return (
		<div>
			<h1>hello </h1>
      {JSON.stringify(data)}
		</div>
	);
}
