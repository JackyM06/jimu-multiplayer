## jimu-heatmap

`heatmap-collector` 热力图收集代码与jimu-engine关联，如开发数据收集相关内容需要重新发布jimu-engine

`heatmap-renderer ｜ heatmap-warpper` 为热力图渲染代码，不与jimu-engine关联，独立发包即可

### 发布
发布staging环境：
```
npm run deploy-heatmap:staging
```

发布线上环境（ps：谨慎，且要保证代码和v3/master最新代码同步，避免覆盖他人的修改）：
```
npm run deploy-heatmap:prod
```