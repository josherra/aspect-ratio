import {
  Box,
  Fade,
  ListItem,
  ListItemAvatar,
  Avatar,
  TextField,
  List,
  ListItemText,
} from "@mui/material";

export const Search = ({
  games,
  handleQuery,
  query,
  addItemToList,
  isSearching = { isSearching },
}) => {
  return (
    <Box sx={{ width: 500, maxWidth: "100%", margin: "1rem auto" }}>
      <TextField
        onChange={handleQuery}
        helperText="Enter a game to search"
        fullWidth
        value={query}
        style={{ position: "relative" }}
      />
      {games.length > 0 ? (
        <Fade in={games.length > 0} timeout={500}>
          <Box
            sx={{
              width: 500,
              height: 300,
              backgroundColor: "background.paper",
              position: "absolute",
              zIndex: 99,
              border: "1px solid white",
            }}
          >
            <List
              sx={{
                width: "100%",
                position: "absolute",
              }}
            >
              {games.map((game) => (
                <ListItem
                  key={game.id}
                  style={{ cursor: "pointer" }}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                  onClick={() => addItemToList(game)}
                >
                  <ListItemAvatar>
                    <Avatar alt={game.name} src={`${game.cover.url}`} />
                  </ListItemAvatar>
                  <ListItemText>{game.name}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Fade>
      ) : (
        ""
      )}
    </Box>
  );
};
