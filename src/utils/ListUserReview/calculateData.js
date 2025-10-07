function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

export default function calculateDate(createTime) {
  const now = new Date();
  const past = new Date(createTime);

  const diffMs = now - past;
  if (diffMs < 0) return "только что";

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) {
    return `${seconds} ${declOfNum(seconds, [
      "секунда",
      "секунды",
      "секунд",
    ])} назад`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${declOfNum(minutes, [
      "минута",
      "минуты",
      "минут",
    ])} назад`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${declOfNum(hours, ["час", "часа", "часов"])} назад`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} ${declOfNum(days, ["день", "дня", "дней"])} назад`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 5) {
    return `${weeks} ${declOfNum(weeks, ["неделя", "недели", "недель"])} назад`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ${declOfNum(months, [
      "месяц",
      "месяца",
      "месяцев",
    ])} назад`;
  }

  const years = Math.floor(days / 365);
  return `${years} ${declOfNum(years, ["год", "года", "лет"])} назад`;
}
