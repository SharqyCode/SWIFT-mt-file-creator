export default function generateSwift(data) {
  return `{1:${data.block1}}
{2:${data.block2}}
{3:${data.block3}}
:20:${data.ref}
:23B:${data.operation}
:32A:${data.date}${data.currency}${data.amount}
:50K:${data.sender}
:52A:${data.senderBank}
:57A:${data.receiverBank}
:59:${data.receiver}
:71A:${data.charges}
:71F:${data.detailsOfCharges}
-}`;
};
