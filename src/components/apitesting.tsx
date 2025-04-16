import React, { useEffect, useState } from "react";
import axios from "axios";
import { useActiveWalletChain } from "thirdweb/react";

const EventFetcher = () => {
  const chain = useActiveWalletChain();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chain?.id) return;

    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://insight.thirdweb.com/v1/events",
          {
            params: {
              chain: 1,
            //   sort_by: "timestamp",
            //   sort_order: "desc",
            //   limit: 20,
            //   page: 1,
            },
            headers: {
              "x-client-id": process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
            },
          }
          );
          console.log("🚀 ~ response:", response);
          
        setEvents(response.data?.events || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [chain]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Thirdweb Events for chain ID: {chain?.id}</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <pre>{JSON.stringify(event, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventFetcher;
