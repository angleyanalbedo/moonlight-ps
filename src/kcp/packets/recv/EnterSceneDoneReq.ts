import {
  SceneEntityAppearNotify,
  EnterSceneDoneRsp,
  EnterSceneDoneReq,
  WorldPlayerLocationNotify,
  ScenePlayerLocationNotify,
  PlayerLocationInfo,
  Vector,
  PlayerWorldLocationInfo,
  WorldPlayerRTTNotify,
  PlayerRTTInfo,
} from '../../../data/proto/game';
import { Session } from '../../session';
import { DataPacket } from '../../packet';
import ProtoFactory from '../../../utils/ProtoFactory';
import { GameConstants } from '../../../utils/Constants';

export default async function handle(session: Session, packet: DataPacket) {
  const body = ProtoFactory.getBody(packet) as EnterSceneDoneReq;

  session.send(
    SceneEntityAppearNotify,
    SceneEntityAppearNotify.fromJSON({
      appearType: 'VISION_TYPE_BORN',
      entityList: [
        {
          entityType: 'PROT_ENTITY_TYPE_AVATAR',
          entityId: 16777219,
          motionInfo: {
            pos: {
              x: GameConstants.START_POSITION.x,
              y: GameConstants.START_POSITION.y,
              z: GameConstants.START_POSITION.z,
            },
            rot: {
              y: 15,
            },
            speed: {},
          },
          propList: [
            {
              type: 4001,
              propValue: {
                type: 4001,
                val: '90',
                ival: '90',
              },
            },
          ],
          fightPropList: [
            {
              propType: 1010,
              propValue: 12490.830078125,
            },
            {
              propType: 4,
              propValue: 341.35223388671875,
            },
            {
              propType: 2002,
              propValue: 859.2437744140625,
            },
            {
              propType: 2001,
              propValue: 341.35223388671875,
            },
            {
              propType: 2000,
              propValue: 12490.830078125,
            },
            {
              propType: 1,
              propValue: 12490.830078125,
            },
            {
              propType: 71,
              propValue: 80.0,
            },
            {
              propType: 1001,
              propValue: 13.0,
            },
            {
              propType: 7,
              propValue: 859.2437744140625,
            },
            {
              propType: 23,
              propValue: 1.0,
            },
            {
              propType: 22,
              propValue: 0.8840000033378601,
            },
            {
              propType: 20,
              propValue: 0.05000000074505806,
            },
          ],
          lifeState: 1,
          animatorParaList: [{}],
          entityClientData: {},
          entityAuthorityInfo: {
            abilityInfo: {},
            rendererChangedInfo: {},
            aiInfo: {
              isAiOpen: true,
              bornPos: {},
            },
            bornPos: {},
          },
          avatar: {
            uid: 1,
            avatarId: 10000071,
            guid: '296352743474',
            peerId: 1,
            equipIdList: [13101],
            skillDepotId: 7101,
            talentIdList: [716, 715, 714, 711, 713, 712],
            weapon: {
              entityId: 100663300,
              gadgetId: 50013101,
              itemId: 13101,
              guid: '296352743532',
              level: 1,
              abilityInfo: {},
            },
            coreProudSkillLevel: 6,
            inherentProudSkillList: [712201, 712301, 712101],
            skillLevelMap: {
              '10712': 1,
              '10715': 1,
              '10711': 1,
            },
            proudSkillExtraLevelMap: {
              '7139': 3,
              '7132': 3,
            },
            wearingFlycloakId: 140001,
            bornTime: Date.now(),
          },
        },
      ],
    })
  );

  session.send(
    WorldPlayerLocationNotify,
    WorldPlayerLocationNotify.fromPartial({
      playerWorldLocList: [
        PlayerWorldLocationInfo.fromPartial({
          playerLoc: PlayerLocationInfo.fromPartial({
            uid: session.uid,
            pos: GameConstants.START_POSITION,
            rot: Vector.fromPartial({ x: 0, y: 15, z: 0 }),
          }),
          sceneId: body.enterSceneToken,
        }),
      ],
    })
  );

  session.send(
    ScenePlayerLocationNotify,
    ScenePlayerLocationNotify.fromPartial({
      sceneId: body.enterSceneToken,
      playerLocList: [
        PlayerLocationInfo.fromPartial({
          uid: session.uid,
          pos: GameConstants.START_POSITION,
          rot: Vector.fromPartial({ x: 0, y: 15, z: 0 }),
        }),
      ],
    })
  );

  session.send(
    WorldPlayerRTTNotify,
    WorldPlayerRTTNotify.fromPartial({
      playerRttList: [
        PlayerRTTInfo.fromPartial({
          uid: session.uid,
          rtt: 10,
        }),
      ],
    })
  );

  session.send(
    EnterSceneDoneRsp,
    EnterSceneDoneRsp.fromPartial({
      enterSceneToken: body.enterSceneToken,
    })
  );
}
