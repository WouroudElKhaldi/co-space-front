"use client";

import { getAllEvents } from "@/fetchData/event";
import styles from "./eventPage.module.css";
import useEventStore from "@/zustand/eventsStore";
import Loading from "../loading/loading";
import { EventComp } from "../eventComp/eventComp";
import { useState, useEffect } from "react";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";

export default function EventPage() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  const { eventsData, setEventsData } = useEventStore();
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      const res = await getAllEvents();
      setEventsData(res.data);
      setLoading(false);
    };

    fetchEvents();
  }, [setEventsData]);

  const totalPages = Math.ceil(eventsData.length / eventsPerPage);

  // Calculate start and end index of events for the current page
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = eventsData.slice(startIndex, endIndex);

  return (
    <div>
      <section className={styles.hero_Container}>
        <div className={styles.img}></div> {/* Background container */}
        <div className={styles.content}>
          <div className={styles.slogan__container}>
            <p className={styles.slogan}>Our Latest Events</p>
          </div>
        </div>
      </section>
      <div className={styles.space_holder}>
        {loading ? (
          <Loading height={"40vh"} width={"100vw"} />
        ) : (
          <>
            {eventsData &&
              eventsData.map((event, index) => {
                return <EventComp key={index} data={event} />;
              })}
          </>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            variant="outlined"
            // shape="rounded"
            sx={{
              "& .MuiPaginationItem-root:hover": {
                bgcolor: "#c86823",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                bgcolor: "#c86823",
              },
            }}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                disabled={!paginatedEvents.length && item.page === currentPage}
              />
            )}
          />
        </Stack>
      </div>
    </div>
  );
}
