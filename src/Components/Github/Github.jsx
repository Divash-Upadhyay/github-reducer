import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";

const initState = {
  loading: true,
  error: false,
  data: null,
  nam: null,
};

const githubActions = {
  fetch: "fetch",
  success: "success",
  failure: "failure",
};

const githubReducer = (state, action) => {
  switch (action.type) {
    case githubActions.fetch: {
      return {
        ...state,
        loading: true,
        error: false,
        data: null,
      };
    }
    case githubActions.success: {
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    }
    case githubActions.failure: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
};

export const Github = () => {
  let [{ loading, error, data, nam }, dispatch] = useReducer(
    githubReducer,
    initState
  );

  const change = (e) => {
    nam = e.target.value;
    console.log(nam);
  };

  useEffect(() => {
    dispatch({
      type: githubActions.fetch,
    });
    axios({
      method: "GET",
      url: "https://api.github.com/search/users",
      params: {
        q: `${nam}`,
      },
    })
      .then((res) => {
        dispatch({
          type: githubActions.success,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: githubActions.failure,
        });
      });
  }, [nam]);
  console.log(data);
  return (
    <div>
      {loading && <div>Loading</div>}
      {error && <div>Error</div>}
      {/* {data?.items.map((item) => (
        <div key={item.id}>{item.login}</div>
      ))} */}
      <input type="text" onChange={change} placeholder="Enter Username" />
      <button
        onClick={() => {
          dispatch({ type: githubActions.fetch }), console.table(initState);
        }}
      >
        Search
      </button>
    </div>
  );
};
