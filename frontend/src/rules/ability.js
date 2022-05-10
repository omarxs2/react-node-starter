import { Ability, defineAbility } from "@casl/ability"
import configureStore from '../configureStore';
const { store } = configureStore()

function subjectName(item) {
  if (!item || typeof item === "string") {
    return item
  }
  return item.__type
}

const ability = new Ability([], { subjectName });

let currentUser;
store.subscribe(() => {
  const prevAuth = currentUser;
  currentUser = store.getState().auth.loginApp.user;
  if (prevAuth !== currentUser) {
    ability.update(Omar(currentUser).rules);
  }
});


const Omar = (user) => {
  return defineAbility((can) => {
    if (user.role === "Agent") {
      can("view", "Proposal", { authorId: user.id })
      can("view", "Draft")
      can("apply", "Proposal")
      can("view", "Profile")
      can("view", "Teams")
    }
    if (user.role === "Admin") {
      can("add", "Record", { authorId: user.id })
      can("view", "Proposal")
      can("accept", "Application")
      can("reject", "Application")
      can("view", "PendingReviews")
    }
    if (user.role === "SubAgent") {
      can("review", "Proposal")
    }
  });

}

export default ability;


