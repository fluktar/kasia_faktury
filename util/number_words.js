function numberToWordsPL(n) {
  const units = [
    "zero",
    "jeden",
    "dwa",
    "trzy",
    "cztery",
    "pięć",
    "sześć",
    "siedem",
    "osiem",
    "dziewięć",
    "dziesięć",
    "jedenaście",
    "dwanaście",
    "trzynaście",
    "czternaście",
    "piętnaście",
    "szesnaście",
    "siedemnaście",
    "osiemnaście",
    "dziewiętnaście",
  ];
  const tens = [
    "",
    "",
    "dwadzieścia",
    "trzydzieści",
    "czterdzieści",
    "pięćdziesiąt",
    "sześćdziesiąt",
    "siedemdziesiąt",
    "osiemdziesiąt",
    "dziewięćdziesiąt",
  ];
  const hundreds = [
    "",
    "sto",
    "dwieście",
    "trzysta",
    "czterysta",
    "pięćset",
    "sześćset",
    "siedemset",
    "osiemset",
    "dziewięćset",
  ];
  const scales = [
    "",
    "tysiąc",
    "milion",
    "miliard",
    "bilion",
    "biliard",
    "trylion",
    "tryliard",
  ];

  function convert(n) {
    if (n < 20) return units[n];
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + units[n % 10] : "")
      );
    if (n < 1000)
      return (
        hundreds[Math.floor(n / 100)] +
        (n % 100 !== 0 ? " " + convert(n % 100) : "")
      );
    for (let i = 0, p = 1; p <= n; i++, p *= 1000) {
      if (n < p * 1000) {
        const base = Math.floor(n / p);
        const rest = n % p;
        return (
          convert(base) +
          " " +
          scales[i] +
          (rest !== 0 ? " " + convert(rest) : "")
        );
      }
    }
  }

  return convert(n);
}

module.exports = numberToWordsPL;
