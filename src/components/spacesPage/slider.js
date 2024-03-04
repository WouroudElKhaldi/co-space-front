import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function RangeSlider({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) {
  const handleChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        sx={{
          color: "#b4602d",
        }}
        getAriaLabel={() => "Price range"}
        value={[minPrice, maxPrice]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
      />
    </Box>
  );
}
