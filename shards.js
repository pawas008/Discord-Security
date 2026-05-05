const { ClusterManager, HeartbeatManager } = require("discord-hybrid-sharding");
const config = require("./config.json");

// Use Railway env first, fallback to config
const TOKEN = process.env.TOKEN || config.TOKEN;

if (!TOKEN) {
    console.error("❌ TOKEN is missing! Add it in Railway Variables.");
    process.exit(1);
}

const manager = new ClusterManager(`${__dirname}/index.js`, {
    totalShards: "auto",
    shardsPerCluster: 2,
    mode: "process",
    token: TOKEN,
});

manager.on("clusterCreate", cluster =>
    console.log(`🚀 Launched Cluster ${cluster.id}`)
);

manager.extend(
    new HeartbeatManager({
        interval: 2000,
        maxMissedHeartbeats: 5,
    })
);

manager.spawn({ timeout: -1 });
