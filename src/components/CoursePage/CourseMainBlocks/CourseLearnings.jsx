export default function CourseLearnings({ learningOutcomes }) {
  return (
    <div className="block course-block" id="learnings-block">
      <div className="course-block-header">Чему вы научитесь</div>
      <ul className="point-text">
        {learningOutcomes.map((learning, index) => {
          return <li key={index}>{learning}</li>;
        })}
      </ul>
    </div>
  );
}
