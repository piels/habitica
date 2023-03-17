<template>
  <div>
    <div
      v-for="(seeker, index) in seekers"
      :key="seeker._id"
      class="seeker"
    >
      <strong
        @click="showMemberModal(seeker._id)"
      >
        Username: @{{ seeker.auth.local.username }}
      </strong>
      <div>Profile name: {{ seeker.profile.name }}</div>
      <div>UUID: {{ seeker._id }}</div>
      <div>Last logged in: {{ seeker.auth.timestamps.loggedin }}</div>
      <div>Check-ins: {{ seeker.loginIncentives }}</div>
      <div>Tier: {{ seeker.contributor.level }}</div>
      <div>Language: {{ seeker.preferences.language }}</div>
      <div>Class: {{ seeker.stats.class }}</div>
      <strong
        v-if="!seeker.invited"
        @click="inviteUser(seeker._id, index)"
      >
        Invite User
      </strong>
      <strong
        v-else
        @click="rescindInvite(seeker._id, index)"
      >
        Invitation Pending. Click to Rescind Invite
      </strong>
    </div>
    <strong
      v-if="seekers.length % 30 === 0"
      @click="loadMore()"
    >
      Load More
    </strong>
  </div>
</template>

<style lang="scss" scoped>
  strong {
    cursor: pointer;
  }
  .seeker:not(:last-of-type) {
    margin-bottom: 1rem;
  }
</style>

<script>
import { mapState } from '@/libs/store';

export default {
  data () {
    return {
      page: 0,
      party: {},
      seekers: [],
    };
  },
  computed: {
    ...mapState({
      user: 'user.data',
    }),
  },
  async mounted () {
    try {
      this.party = await this.$store.dispatch('guilds:getGroup', { groupId: this.user.party._id });
    } catch {
      this.$router.push('/');
    }
    if (!this.party._id || this.party.leader._id !== this.user._id) {
      this.$router.push('/');
    } else {
      this.$store.dispatch('common:setTitle', {
        section: 'Party Seekers',
      });
      this.seekers = await this.$store.dispatch('guilds:getPartySeekers');
    }
  },
  methods: {
    async inviteUser (userId, index) {
      await this.$store.dispatch('guilds:invite', {
        invitationDetails: {
          inviter: this.user.profile.name,
          uuids: [userId],
        },
        groupId: this.party._id,
      });
      this.seekers[index].invited = true;
    },
    async loadMore () {
      this.page += 1;
      const addlSeekers = await this.$store.dispatch('guilds:getPartySeekers', { page: this.page });
      this.seekers = this.seekers.concat(addlSeekers);
    },
    async rescindInvite (userId, index) {
      await this.$store.dispatch('members:removeMember', {
        memberId: userId,
        groupId: this.party._id,
      });
      this.seekers[index].invited = false;
    },
    showMemberModal (userId) {
      this.$router.push({ name: 'userProfile', params: { userId } });
    },
  },
};
</script>
