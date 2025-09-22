import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function ModuleInfo({ module }) {
  return (
    <>
      <div className={styles.main}>
        <span>
          {module.number}. {module.name}
        </span>
      </div>
      <div className={styles.aditional}>
        {module.submodules.map((submodule) => (
          <Link key={submodule.id} to={`${submodule.id}/step/1`}>
            {module.number}.{submodule.number} {submodule.name}
            <span>
              {submodule.completedStepsCount}/{submodule.totalStepsCount}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
