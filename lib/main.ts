function run() {
  const node = mg.document.currentPage.selection[0];

  if (!node) {
    mg.notify('请先选中一个节点', { type: 'warning' });
    return;
  }

  if (node.type !== 'PEN') {
    mg.notify('选中的节点不是路径节点', { type: 'warning' });
    return;
  }

  const paths = node.penPaths;
  const pathArray = paths.data.split('Z');

  let count = 0;
  for (const path of pathArray) {
    if (!path) continue;
    const penNode = node.clone();
    penNode.penPaths = [
      {
        data: path + 'Z',
        windingRule: paths.windingRule,
      },
    ];
    count += 1;
    node.parent?.insertChild(node.parent.children.indexOf(node) + 1, penNode);
  }

  node.isVisible = false;
  mg.notify(`路径已分离为 ${count} 个`, { type: 'success' });
}

run();
