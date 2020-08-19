// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  const data = [
    { name: 'Alex', id: 1 },
    { name: 'Fei', id: 2 },
    { name: 'Peng', id: 3 },
  ];
  res.json(data);
};
