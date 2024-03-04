"use client";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Accordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        sx={{
          boxShadow: "1px 1px 5px gray",
        }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          sx={{
            bgcolor: "white",
            height: "5.5rem",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{
              width: "100%",
              flexShrink: 0,
              fontWeight: 600,
              color: "#4d6188",
            }}
          >
            Can users book coworking spaces on CoSpace for short-term or
            long-term stays?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "#ededf5",
            minHeight: "7rem",
          }}
        >
          <Typography>
            Yes, CoSpace accommodates both short-term and long-term bookings for
            coworking spaces. Users have the flexibility to reserve spaces for
            as little as a day or as long as they need.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: "1px 1px 5px gray",
        }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          sx={{
            bgcolor: "white",
            height: "5.5rem",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{
              width: "100%",
              flexShrink: 0,
              fontWeight: 600,
              color: "#4d6188",
            }}
          >
            Is there a fee for coworking space owners to list their venues on
            CoSpace?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "#ededf5",
            minHeight: "7rem",
          }}
        >
          <Typography>
            No, listing coworking spaces on CoSpace is completely free. We want
            to make it easy for space owners to showcase their venues without
            any fees. This encourages more owners to participate, giving users a
            wider range of options to choose from. Our goal is to help space
            owners attract more clients without any upfront costs.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: "1px 1px 5px gray",
        }}
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          sx={{
            bgcolor: "white",
            height: "5.5rem",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography
            sx={{
              width: "100%",
              flexShrink: 0,
              fontWeight: 600,
              color: "#4d6188",
            }}
          >
            How does the process work for coworking space owners who want to
            list their space on CoSpace?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "#ededf5",
            minHeight: "7rem",
          }}
        >
          <Typography>
            Once coworking space owners submit a request to list their space on
            CoSpace, our team reviews and approves it. If accepted, owners gain
            access to their dashboard and their space appears on the website for
            users to discover. However, if the request is not accepted, owners
            do not gain access to the dashboard, and their space is not listed
            on the website. This ensures only verified and approved spaces are
            showcased on CoSpace, maintaining the quality and reliability of our
            listings.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: "1px 1px 5px gray",
        }}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          sx={{
            bgcolor: "white",
            height: "5.5rem",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography
            sx={{
              width: "100%",
              flexShrink: 0,
              fontWeight: 600,
              color: "#4d6188",
            }}
          >
            What measures does CoSpace have in place to protect user privacy and
            data security?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "#ededf5",
            minHeight: "7rem",
          }}
        >
          <Typography>
            {` To ensure security, we implement industry-standard practices such as
            hashing passwords. Additionally, our account verification process requires users to verify their email
            addresses before accessing their accounts, helping to prevent
            unauthorized access. Furthermore, we provide a "forgot password"
            option for users who need to reset their passwords, ensuring ease of
            access while maintaining robust security measures.`}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: "1px 1px 5px gray",
        }}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          sx={{
            bgcolor: "white",
            height: "5.5rem",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography
            sx={{
              width: "100%",
              flexShrink: 0,
              fontWeight: 600,
              color: "#4d6188",
            }}
          >
            How can coworking space owners update their venue information on
            CoSpace?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "#ededf5",
            minHeight: "7rem",
          }}
        >
          <Typography>
            Coworking space owners have full control over updating their venue
            information on CoSpace through a user-friendly dashboard. Upon
            creating an account and listing their coworking space on our
            platform, owners can easily manage and edit various details such as
            amenities, pricing, availability, and location. With just a few
            clicks, owners can make real-time updates to ensure that their venue
            information remains accurate and up-to-date for potential users.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
