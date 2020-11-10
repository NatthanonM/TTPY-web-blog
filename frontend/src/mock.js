export const posts = [
  {
    id: 3,
    owner: "Natthanon Manop",
    datetime: Date.now(),
    content:
      "Computer security, cybersecurity or information technology security (IT security) is the protection of computer systems and networks from the theft of or damage to their hardware, software, or electronic data, as well as from the disruption or misdirection of the services they provide.",
    comments: [
      {
        id: 4,
        owner: "Natthanon Manop",
        datetime: Date.now(),
        content:
          "Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1 Comment 1",
      },
      {
        id: 3,
        owner: "Karnkitti Kittikamron",
        datetime: Date.now(),
        content: "Comment 2",
      },
    ],
  },
  {
    id: 2,
    owner: "Natthanon Manop",
    datetime: Date.now() - 1000 * 60 * 5,
    content:
      "Computer security basically is the protection of computer systems and information from harm, theft, and unauthorized use. It is the process of preventing and detecting unauthorized use of your computer system.",
    comments: [
      {
        id: 2,
        owner: "Yanika Dontong",
        datetime: Date.now(),
        content: "Comment 1",
      },
    ],
  },
  {
    id: 1,
    owner: "Suchut Sapsathien",
    datetime: Date.now() - 1000 * 60 * 10,
    content:
      "Computer security, the protection of computer systems and information from harm, theft, and unauthorized use. Computer hardware is typically protected by the same means used to protect other valuable or sensitive equipment, namely, serial numbers, doors and locks, and alarms. The protection of information and system access, on the other hand, is achieved through other tactics, some of them quite complex.",
    comments: [
      {
        id: 1,
        owner: "Yanika Dontong",
        datetime: Date.now(),
        content: "Comment 1",
      },
    ],
  },
];
