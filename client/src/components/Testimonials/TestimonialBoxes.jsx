import React from "react";
import TestimonialBox from "./TestimonialBox";

function TestimonialBoxes() {
  return (
    <>
      <TestimonialBox
        text=" “I have bean looking for a best gym house but it was difficult to find the gym that has flexible schedule and pricing plan. finally i got it. highly recommended.”"
        name="John Wick"
        job="Starbucks Employee"
        id={1}
      />
      <TestimonialBox
        text=" “I had been worked out for last 2 years in this gym, now i am in different level. i always wonder how they treat their customer and they just gave me additional 1 month training with out any payment. why don't you try it now. ”"
        name="Harry Potter"
        job="CEO of Hogwarts"
        id={2}
      />
      <TestimonialBox
        text=" “I've been a member of Gymate for the past 6 months and it has been an amazing experience. The trainers are knowledgeable and supportive, the
                  equipment is top-notch, and the community of members is friendly and
                  encouraging.”"
        name="Bill Gates"
        job="Founder of Microsoft"
        id={3}
      />
    </>
  );
}

export default TestimonialBoxes;
