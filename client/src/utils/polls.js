export function pollArrToObj (polls) {
  return polls.reduce((prev, cur) => {
    return {
      ...prev,
      [cur._id]: {
        ...cur,
        createdAt: new Date(cur.createdAt).toDateString()
      }
    };
  }, {});
}
