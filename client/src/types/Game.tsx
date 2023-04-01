export interface IGame {
  id: any;
  name: String;
  cover: {
    id: any;
    image_id: String;
    url: String;
  };
  platforms: [{ id: Number; name: String }];
}
