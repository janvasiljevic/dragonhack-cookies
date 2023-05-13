import { Book } from '@/api/model';
import { Box, Flex, Text, createStyles, rem } from '@mantine/core';

const useStyles = createStyles((t) => ({
  bookFlex: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid black',
    borderRadius: '5px',
    height: rem(250),
    width: rem(180),
    backgroundSize: 'cover',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'end',

    '&:hover': {
      backgroundColor: t.colors.gray[0],
    },
  },
  bookFlexDisabled: {
    filter: 'grayscale(100%)',
    opacity: 0.5,
  },
  flexCover: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.8,
    background:
      'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(1,0,13,1) 42%, rgba(0,0,0,0) 100%)',
  },
  text: {
    color: 'white',
    zIndex: 1,
  },
  textBottom: {
    color: 'white',
    zIndex: 1,
    fontFamily: t.fontFamilyMonospace,
    marginBottom: t.spacing.md,
  },
}));

type Props = {
  book: Book;
};

const BookDisplay = ({ book }: Props) => {
  const { classes, cx } = useStyles();

  return (
    <Flex
      key={book.id}
      className={cx(classes.bookFlex, {
        [classes.bookFlexDisabled]: book.status !== 'AVAILABLE',
      })}
      sx={{ backgroundImage: `url(${book.coverUrl})` }}
    >
      <Box className={classes.flexCover}></Box>
      <Text className={classes.text}> {book.title} </Text>
      <Text className={classes.textBottom}> {book.author} </Text>
    </Flex>
  );
};

export default BookDisplay;
