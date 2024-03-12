export const hanldeScore = (reviewsAvg) => {
    if (reviewsAvg === 1) {
      return (<>
       <i className="bi bi-star text-primary fs-5"></i>
        {/* <i className="bi bi-star-fill text-primary fs-5"></i> */}
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        
      </>);
    }
    if (reviewsAvg > 1 && reviewsAvg < 2) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg === 2) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg > 2 && reviewsAvg < 3) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg === 3) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg > 3 && reviewsAvg < 4) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg === 4) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg > 4 && reviewsAvg < 5) {
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
      </>);
    }
    if (reviewsAvg === 5) {
      return (
        <>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
        </>
      );
    }
  }