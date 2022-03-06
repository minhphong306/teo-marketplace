import User from "../../user/entity/user.entity";

interface IRequestWithUser extends Request {
  user: User
}

export default IRequestWithUser;
