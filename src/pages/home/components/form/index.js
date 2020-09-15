import React from "react";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/core";

const Form = () => {
  return (
    <Box
      width={{ sm: "100%", md: "70%", lg: "50%" }}
      m={{ sm: "0 20px", lg: 0 }}
    >
      <form>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl mt={6}>
          <FormLabel>Image Url</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl mt={6}>
          <FormLabel>Address</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl mt={6}>
          <FormLabel>Raiting</FormLabel>
          <Input type="number" />
        </FormControl>
        <Button width="full" mt={4} type="submit">
          Add a Restaurant
        </Button>
      </form>
    </Box>
  );
};

export default Form;
