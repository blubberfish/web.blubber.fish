import { List, ListEntry, Section, Title } from "./_components";

export default function Component() {
  return (
    <Section>
      <Title>Accounts</Title>
      <List>
        <Bone />
        <Bone />
      </List>
    </Section>
  );
}

function Bone() {
  return (
    <ListEntry>
      <div className="p-3 gap-3 flex flex-row flex-nowrap items-center">
        <div className="size-6 bg-gray-400 rounded animate-pulse"></div>
        <div className="w-[8ch] bg-gray-400 rounded animate-pulse">&nbsp;</div>
      </div>
    </ListEntry>
  );
}
