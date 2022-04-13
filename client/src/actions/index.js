import history from "../history";
import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

function dispatchMessage(dispatch, { type, payload }) {
  dispatch({ type, payload });
  setTimeout(() => {
    dispatch({ type, payload: "" });
  }, 3000);
}

export const register = (creds) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post("/register", creds);

      if (data.username) {
        dispatch({ type: "REGISTER", payload: data });
        if (history.action !== "POP") history.goBack();
        else history.push("/");
      } else {
        dispatchMessage(dispatch, { type: "ERROR", payload: data });
      }
    })();
  };
};

export const login = (creds) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post("/login", creds);

      if (data.username) {
        dispatch({ type: "LOG_IN", payload: data });
        if (history.action !== "POP") history.goBack();
        else history.push("/");
      } else {
        dispatchMessage(dispatch, { type: "ERROR", payload: data });
      }
    })();
  };
};

export const logout = () => {
  return (dispatch) => {
    (async () => {
      await instance.post("/logout");
      dispatch({ type: "LOG_OUT" });
      dispatchMessage(dispatch, {
        type: "FLASH_MESSAGE",
        payload: "You are logged out",
      });
    })();
  };
};

export const createAttraction = (values) => {
  let { name, location, description, images } = values;
  let fd = new FormData();
  fd.append("name", name);
  fd.append("description", description);
  fd.append("location", location);
  for (let image of images) {
    fd.append("images", image);
  }
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post("/attractions", fd);
      dispatch({ type: "CREAT_ATTRACTION", payload: data });

      dispatchMessage(dispatch, {
        type: "FLASH_MESSAGE",
        payload: "Attraction has been created",
      });
      history.push(`/attractions/${data._id}`);
    })();
  };
};
export const emptyQuery = () => {
  return { type: "QUERY", payload: "" };
};

export const editAttraction = (values) => {
  let { name, location, description, images, _id, deleteImages } = values;
  let fd = new FormData();
  fd.append("name", name);
  fd.append("description", description);
  fd.append("location", location);
  fd.append("deleteImages", JSON.stringify(deleteImages));
  if (images) {
    for (let image of images) {
      fd.append("images", image);
    }
  }
  return (dispatch) => {
    (async () => {
      let { data } = await instance.put(`/attractions/${_id}`, fd);

      dispatch({ type: "CREAT_ATTRACTION", payload: data });

      dispatchMessage(dispatch, {
        type: "FLASH_MESSAGE",
        payload: "Attraction has been edited",
      });

      history.push(`/attractions/${data._id}`);
    })();
  };
};

export const getAttraction = (id) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get(`/attractions/${id}`);
      dispatch({ type: "GET_ATTRACTION", payload: data });
    })();
  };
};

export const getAttractions = () => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get("/attractions");
      dispatch({ type: "GET_ATTRACTIONS", payload: data });
    })();
  };
};

export const searchAttractions = (query) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get(`/attractions/search?q=${query}`);
      dispatch({ type: "ATTRACTIONS_SEARCH_RESULTS", payload: data });
      dispatch({ type: "QUERY", payload: query });
    })();
  };
};

export const getAllAttractions = () => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get("/attractions/all");
      dispatch({ type: "GET_ATTRACTIONS", payload: data });
    })();
  };
};

export const deleteAttraction = (id) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.delete(`/attractions/${id}`);
      dispatch({ type: "DELETE_ATTRACTION", payload: data });
      dispatch({
        type: "FLASH_MESSAGE",
        payload: "Attraction has been deleted",
      });
      setTimeout(() => {
        dispatch({
          type: "FLASH_MESSAGE",
          payload: "",
        });
      }, 5000);
      history.push("/");
    })();
  };
};

export const addAttractionReview = ({ attractionId, content, stars }) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post(
        `/attractions/${attractionId}/reviews`,
        { content, stars }
      );
      dispatch({ type: "GET_ATTRACTION", payload: data });
    })();
  };
};

export const deleteAttrationReview = ({ attractionId, reviewId }) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.delete(
        `/attractions/${attractionId}/reviews/${reviewId}`
      );

      dispatch({ type: "GET_ATTRACTION", payload: data });
    })();
  };
};

export const addToBeenThere = (attractionId) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post(
        `/attractions/${attractionId}/beenthere`
      );
      if (data !== "ALREADY ADDED") {
        dispatch(getAttraction(attractionId));
        dispatch({ type: "UPDATE_USER_LIST", payload: data });

        dispatch({
          type: "FLASH_MESSAGE",
          payload: "Attraction has been to your list",
        });
        setTimeout(() => {
          dispatch({
            type: "FLASH_MESSAGE",
            payload: "",
          });
        }, 5000);
      }
    })();
  };
};

export const addToWantToVisit = (attractionId) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post(
        `/attractions/${attractionId}/wanttovist`
      );
      if (data !== "ALREADY ADDED") {
        dispatch(getAttraction(attractionId));
        dispatch({ type: "UPDATE_USER_LIST", payload: data });

        dispatch({
          type: "FLASH_MESSAGE",
          payload: "Attraction has been added to your list",
        });
        setTimeout(() => {
          dispatch({
            type: "FLASH_MESSAGE",
            payload: "",
          });
        }, 5000);
      }
    })();
  };
};

export const addToList = (attractionId) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post(`/attractions/${attractionId}/list`);
      if (data !== "WRONG REQUEST") {
        dispatch({ type: "UPDATE_USER_LIST", payload: data });

        dispatch({
          type: "FLASH_MESSAGE",
          payload: "Attraction has been added to your list",
        });
        setTimeout(() => {
          dispatch({
            type: "FLASH_MESSAGE",
            payload: "",
          });
        }, 5000);
      }
    })();
  };
};

export const removeFromList = (attractionId) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.delete(`/attractions/${attractionId}/list`);
      if (data !== "WRONG REQUEST") {
        dispatch({ type: "UPDATE_USER_LIST", payload: data });

        dispatch({
          type: "FLASH_MESSAGE",
          payload: "Attraction has been removed to your list",
        });
        setTimeout(() => {
          dispatch({
            type: "FLASH_MESSAGE",
            payload: "",
          });
        }, 5000);
      }
    })();
  };
};

export const getUserAttractions = () => {
  return (dispatch) => {
    (async () => {
      let first = await instance.get("/user/beenthere");
      let second = await instance.get("/user/wanttovist");
      let third = await instance.get("/user/list");

      dispatch({
        type: "UPDATE_USER_LIST",
        payload: {
          beenThere: first.data,
          wantToVisit: second.data,
          list: third.data,
        },
      });
    })();
  };
};

export const isLoggedIn = () => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get("/loggedin");
      if (!data.isLoggedIn) dispatch({ type: "LOG_OUT" });
    })();
  };
};

export const getAdresses = (term) => {
  return (dispatch) => {
    (async () => {
      let { data } = await axios.get(
        `https://api.getaddress.io/autocomplete/${term}?expand=true&api-key=t6HEkG_uxU2LWXu4gmnrfg34909`
      );

      dispatch({ type: "GET_ADDRESSES", payload: data.suggestions });
    })();
  };
};

export const googleAuth = (token) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post("/oauth", { token });
      dispatch({ type: "LOG_IN", payload: data });
      if (history.action !== "POP") history.goBack();
      else history.push("/");
    })();
  };
};

export const getAttractionCount = () => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get("/attractions/count");

      dispatch({ type: "GET_ATTRACTION_COUNT", payload: data.count });
    })();
  };
};

// ----------------- STORIES ACTIONS -------------------- //

export const createStory = (story) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post("/stories", story);
      console.log(data);
      dispatch({ type: "CREATE_STORY", payload: data });
      history.push("/stories");
    })();
  };
};
export const getAllStories = () => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get("/stories");
      dispatch({ type: "GET_STORIES", payload: data });
    })();
  };
};
export const getStory = (id) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get(`/stories/${id}`);
      dispatch({ type: "GET_STORY", payload: data });
    })();
  };
};
export const likeStory = (id) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.patch(`/stories/${id}/likes`);
      dispatch({ type: "GET_STORY", payload: data });
    })();
  };
};
export const dislikeStory = (id) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.patch(`/stories/${id}/dislikes`);
      dispatch({ type: "GET_STORY", payload: data });
    })();
  };
};
export const addComment = (id, comment) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post(`/stories/${id}/comments`, {
        comment,
      });
      dispatch({ type: "GET_STORY", payload: data });
    })();
  };
};

export const deteteStoryComment = ({ commentId, sotryId }) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.delete(
        `/stories/${sotryId}/comments/${commentId}`
      );
      dispatch({ type: "GET_STORY", payload: data });
    })();
  };
};

export const getUserStories = (id) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get(`/user/${id}/stories`);
      dispatch({ type: "USER_STORIES", payload: data });
    })();
  };
};

export const getUserStory = (id) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get(`/user/stories/${id}`);
      dispatch({ type: "GET_STORY", payload: data });
    })();
  };
};

export const editStory = (id, story) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.put(`/user/stories/${id}`, story);
      dispatch({ type: "GET_STORY", payload: data });
      history.push(`/stories/${id}`);
    })();
  };
};

export const getStoriesByTag = (tag) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get(`/stories/tag/${tag}`);
      dispatch({ type: "STORIES_TAG", payload: data });
    })();
  };
};

export const searchStories = (query) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get(`/stories/search?q=${query}`);
      dispatch({ type: "SEARCH_STORIES", payload: data });
    })();
  };
};

export const getStoriesByLocation = (locationId) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get(`/stories/attraction/${locationId}`);
      console.log("here");
      dispatch({ type: "ATTRACTION_STORIES", payload: data });
    })();
  };
};
