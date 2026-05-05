const { ClusterManager, HeartbeatManager } = require("discord-hybrid-sharding");
const config = require("./config.json");

const manager = new ClusterManager(`${__dirname}/index.js`, {
    totalShards: "auto",
    shardsPerCluster: 2,
    mode: "process",
    token: config.TOKEN,
});

manager.on("clusterCreate", cluster =>
    console.log(`Launched Cluster ${cluster.id}`)
);

manager.extend(
    new HeartbeatManager({
        interval: 2000,
        maxMissedHeartbeats: 5,
    })
);

manager.spawn({ timeout: -1 });
