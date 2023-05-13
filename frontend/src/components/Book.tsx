import { Book } from '@/api/model';
import { Box, Flex, Text, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((t) => ({
  bookFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    margin: '10px',
    border: '1px solid black',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '500px',
    minWidth: '300px',

    '&:hover': {
      backgroundColor: t.colors.gray[0],
    },
  },
}));

type Props = {
  book: Book;
};

const Book = ({ book }: Props) => {
  const { classes } = useStyles();
  return (
    <Flex className={classes.bookFlex}>
      <Text> {book.title} </Text>
      <Text> todo </Text>
    </Flex>
  );
};

export default Book;
