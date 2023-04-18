<script setup lang='ts'>
import { ElementOperationType } from '@editor/const';
import { LoggerManager } from '@editor/models/logger'
import { ServiceConnect } from '@editor/models/service';
import { formatTime } from '@editor/utils/common'

</script>

<template>
    <!-- <span>Logger History</span> -->
    <div class="logger">
        <div class="tabpanel"  v-for="username in LoggerManager.getLoggerUsers()">
            <span class="username" :class="{self: username === ServiceConnect.username}">{{ username }}</span>
            <div class="logger-container">
                <div
                    class="logger-item"     
                    v-for="{type, eid, time, path, value} in LoggerManager.getUserLoggers(username)"
                    :class="{
                        'create': type === ElementOperationType.CREATE,
                        'delete': type === ElementOperationType.DELETE
                    }"
                >
                    <p >{{ type }}</p>
                    <p >{{ eid }}</p>
                    <p >{{ formatTime(time, 'HH:mm:ss') }}</p>

                    <p >{{ path }}</p>
                    <p >{{ value }}</p>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.logger {
    display: flex;
    justify-content: flex-start;
    background-color: #eee;
    .tabpanel {
        width: 400px;
        border-right: 6px solid #fff;
        .username {
            display: inline-block;
            width: 100%;
            // padding: 5px 10px;
            color: #fff;
            background: #000;

            &.self {
                color: #f7d060;
                font-weight: bolder;
            }
        }
        .logger-container {
            overflow: scroll;
            height: 300px;

            p {
                padding-right: 3px;
                margin: 0;
                font-size: 12px;
            }

            .logger-item {
                display: flex;
                &.create {
                    color: #ef932b;
                    font-weight: bold;
                }
                &.delete {
                    color: #ff6d60;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
